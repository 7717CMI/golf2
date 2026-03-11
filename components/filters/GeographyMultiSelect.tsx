'use client'

import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { useDashboardStore } from '@/lib/store'
import { Check, ChevronDown, ChevronRight } from 'lucide-react'

interface GeoNode {
  name: string
  children: GeoNode[]
  level: number
}

export function GeographyMultiSelect() {
  const { data, filters, updateFilters } = useDashboardStore()
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Build hierarchical tree from geography dimension
  const { tree, flatList } = useMemo(() => {
    if (!data || !data.dimensions?.geographies) return { tree: [], flatList: [] }

    const hierarchy = data.dimensions.geographies.hierarchy || {}
    const allGeos = data.dimensions.geographies.all_geographies || []
    const hiddenGeos = new Set(data.dimensions.geographies.hidden_geographies || [])

    // Find root geographies: those in all_geographies that are NOT children of any other geography
    const allChildren = new Set<string>()
    Object.values(hierarchy).forEach(children => {
      children.forEach(child => allChildren.add(child))
    })

    const buildNode = (name: string, level: number): GeoNode => {
      const children = (hierarchy[name] || [])
        .filter(child => !hiddenGeos.has(child))
        .map(child => buildNode(child, level + 1))
      return { name, children, level }
    }

    // Root nodes: geographies that have children in hierarchy AND are not children of other visible geos
    // OR geographies that are in all_geographies but not children of any other
    const roots: GeoNode[] = []
    const processedAsChild = new Set<string>()

    // First, find geographies that are hierarchy parents and not children of others
    allGeos.forEach(geo => {
      if (!allChildren.has(geo) && !hiddenGeos.has(geo)) {
        roots.push(buildNode(geo, 0))
        // Mark all descendants as processed
        const markDescendants = (parentName: string) => {
          (hierarchy[parentName] || []).forEach(child => {
            processedAsChild.add(child)
            markDescendants(child)
          })
        }
        markDescendants(geo)
      }
    })

    // Add any remaining geographies that aren't part of any hierarchy
    allGeos.forEach(geo => {
      if (!processedAsChild.has(geo) && !roots.find(r => r.name === geo) && !hiddenGeos.has(geo)) {
        roots.push({ name: geo, children: [], level: 0 })
      }
    })

    // Build flat list for search
    const flatList: string[] = []
    const flatten = (nodes: GeoNode[]) => {
      nodes.forEach(node => {
        flatList.push(node.name)
        flatten(node.children)
      })
    }
    flatten(roots)

    return { tree: roots, flatList }
  }, [data])

  // Auto-expand top-level nodes on first open
  useEffect(() => {
    if (tree.length > 0 && expandedNodes.size === 0) {
      const topLevel = new Set(tree.filter(n => n.children.length > 0).map(n => n.name))
      setExpandedNodes(topLevel)
    }
  }, [tree, expandedNodes.size])

  // Get all descendants of a geography node
  const getAllDescendants = useCallback((nodeName: string): string[] => {
    if (!data?.dimensions?.geographies?.hierarchy) return []
    const hierarchy = data.dimensions.geographies.hierarchy
    const descendants: string[] = []
    const collect = (parent: string) => {
      (hierarchy[parent] || []).forEach(child => {
        descendants.push(child)
        collect(child)
      })
    }
    collect(nodeName)
    return descendants
  }, [data])

  const toggleExpand = (geoName: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev)
      if (next.has(geoName)) {
        next.delete(geoName)
      } else {
        next.add(geoName)
      }
      return next
    })
  }

  const handleToggle = (geography: string) => {
    const current = filters.geographies
    const isSelected = current.includes(geography)

    if (isSelected) {
      // Deselect only this geography (not its descendants)
      const updated = current.filter(g => g !== geography)
      updateFilters({ geographies: updated })
    } else {
      // Select only this geography (not its descendants)
      const updated = [...current, geography]
      updateFilters({ geographies: updated })
    }
  }

  const handleSelectAll = () => {
    if (!data) return
    updateFilters({
      geographies: [...flatList]
    })
  }

  const handleClearAll = () => {
    updateFilters({ geographies: [] })
  }

  // Filter tree based on search
  const filteredTree = useMemo(() => {
    if (!searchTerm) return tree

    const search = searchTerm.toLowerCase()

    const filterNode = (node: GeoNode): GeoNode | null => {
      const nameMatches = node.name.toLowerCase().includes(search)
      const filteredChildren = node.children
        .map(child => filterNode(child))
        .filter((n): n is GeoNode => n !== null)

      if (nameMatches || filteredChildren.length > 0) {
        return { ...node, children: filteredChildren }
      }
      return null
    }

    return tree
      .map(node => filterNode(node))
      .filter((n): n is GeoNode => n !== null)
  }, [tree, searchTerm])

  // When searching, expand all matching nodes
  useEffect(() => {
    if (searchTerm) {
      const allParents = new Set<string>()
      const findParents = (nodes: GeoNode[]) => {
        nodes.forEach(node => {
          if (node.children.length > 0) {
            allParents.add(node.name)
            findParents(node.children)
          }
        })
      }
      findParents(filteredTree)
      setExpandedNodes(prev => new Set([...prev, ...allParents]))
    }
  }, [searchTerm, filteredTree])

  if (!data) return null

  const selectedCount = filters.geographies.length

  const renderNode = (node: GeoNode) => {
    const hasChildren = node.children.length > 0
    const isExpanded = expandedNodes.has(node.name)
    const isSelected = filters.geographies.includes(node.name)
    const descendants = getAllDescendants(node.name)
    const someChildrenSelected = descendants.some(d => filters.geographies.includes(d))
    const allChildrenSelected = descendants.length > 0 && descendants.every(d => filters.geographies.includes(d))

    return (
      <div key={node.name}>
        <div
          className={`flex items-center hover:bg-blue-50 cursor-pointer ${
            node.level > 0 ? 'border-t border-gray-50' : 'border-t border-gray-100'
          }`}
          style={{ paddingLeft: `${0.5 + node.level * 1.25}rem` }}
        >
          {/* Expand/Collapse button */}
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleExpand(node.name)
              }}
              className="p-1 hover:bg-gray-200 rounded mr-1 flex-shrink-0"
            >
              {isExpanded ? (
                <ChevronDown className="h-3 w-3 text-gray-500" />
              ) : (
                <ChevronRight className="h-3 w-3 text-gray-500" />
              )}
            </button>
          ) : (
            <span className="w-5 mr-1 flex-shrink-0" />
          )}

          {/* Checkbox + Label */}
          <label className="flex items-center py-2 cursor-pointer flex-1 min-w-0">
            <input
              type="checkbox"
              checked={isSelected}
              ref={(el) => {
                if (el) {
                  el.indeterminate = !isSelected && someChildrenSelected && !allChildrenSelected
                }
              }}
              onChange={() => handleToggle(node.name)}
              className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 flex-shrink-0"
            />
            <span className={`text-sm truncate ${hasChildren ? 'font-medium text-black' : 'text-black'}`}>
              {node.name}
            </span>
            {isSelected && (
              <Check className="ml-auto h-4 w-4 text-blue-600 flex-shrink-0" />
            )}
          </label>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div>
            {node.children.map(child => renderNode(child))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>

      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
      >
        <span className="text-sm text-black">
          {selectedCount === 0
            ? 'Select geographies...'
            : `${selectedCount} selected`}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-96 overflow-hidden">
          {/* Search */}
          <div className="p-3 border-b">
            <input
              type="text"
              placeholder="Search geographies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="px-3 py-2 bg-gray-50 border-b flex gap-2">
            <button
              onClick={handleSelectAll}
              className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              Select All
            </button>
            <button
              onClick={handleClearAll}
              className="px-3 py-1 text-xs bg-gray-100 text-black rounded hover:bg-gray-200"
            >
              Clear All
            </button>
          </div>

          {/* Geography Tree */}
          <div className="overflow-y-auto max-h-64">
            {filteredTree.length === 0 ? (
              <div className="px-3 py-4 text-sm text-black text-center">
                {searchTerm ? 'No geographies found matching your search' : 'No geographies available'}
              </div>
            ) : (
              filteredTree.map(node => renderNode(node))
            )}
          </div>
        </div>
      )}

      {/* Selected Count Badge */}
      {selectedCount > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="text-xs text-black">
            {selectedCount} {selectedCount === 1 ? 'geography' : 'geographies'} selected
          </span>
        </div>
      )}
    </div>
  )
}
