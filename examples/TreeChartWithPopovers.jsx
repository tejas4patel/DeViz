import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import data from "../data/treeData.json"
import EnhancedPopover from "./EnhancedPopover"

const TreeChartWithPopovers = ({ onInteraction }) => {
  const svgRef = useRef()
  const [popover, setPopover] = useState({ visible: false, node: null, x: 0, y: 0 })
  const [firstTime, setFirstTime] = useState(true)
  const hoverTimeoutRef = useRef(null)
  const isMouseOverPopoverRef = useRef(false)
  const currentNodeRef = useRef(null)

  // Function to scroll tree section to top
  const scrollToTree = () => {
    const treeSection = document.querySelector('.tree-section')
    if (treeSection) {
      treeSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  useEffect(() => {
    const hasInteracted = localStorage.getItem('treeInteracted')
    if (hasInteracted === 'true') {
      setFirstTime(false)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  const handleClosePopover = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setPopover({ visible: false, node: null, x: 0, y: 0 })
    currentNodeRef.current = null
  }

  useEffect(() => {
    if (!svgRef.current) return

    // Get parent container dimensions
    const parentSection = svgRef.current.parentElement
    const width = parentSection.clientWidth || 1200
    const height = Math.max(600, window.innerHeight * 0.65)

    // RESPONSIVE SCALING: Detect screen size and adjust tree parameters
    const isMobile = width < 768
    const isTablet = width >= 768 && width < 1024

    // Scale factors based on screen size
    const nodeSpacingX = isMobile ? 140 : isTablet ? 180 : 220
    const nodeSpacingY = isMobile ? 140 : isTablet ? 160 : 180
    const nodeBaseRadius = isMobile ? 10.5 : isTablet ? 13.5 : 18
    const nodeDepthBonus = isMobile ? 1.5 : isTablet ? 2.25 : 3.75
    const baseFontSize = isMobile ? 12 : isTablet ? 14 : 17
    const rootFontSize = isMobile ? 14 : isTablet ? 16 : 20
    const labelSpacing = isMobile ? 30 : isTablet ? 35 : 45
    const maxLabelWidth = isMobile ? 100 : isTablet ? 140 : 180
    const rootMaxLabelWidth = isMobile ? 140 : isTablet ? 180 : 220
    const lineHeight = isMobile ? 16 : isTablet ? 18 : 22
    const rootLineHeight = isMobile ? 18 : isTablet ? 20 : 24
    const linkStrokeWidth = isMobile ? 16 : isTablet ? 20 : 24
    const linkOverlayWidth = isMobile ? 10 : isTablet ? 12 : 16
    const strokeWidth = isMobile ? 2 : 3

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .style("touch-action", "none")
      .style("display", "block")
      .style("margin", "0 auto")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", `translate(${width / 2}, 70)`)

    const zoom = d3.zoom()
      .scaleExtent([0.3, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform)
        setPopover({ visible: false, node: null, x: 0, y: 0 })
      })

    svg.call(zoom)

    const root = d3.hierarchy(data)
    root.x0 = 0
    root.y0 = 0

    if (root.children) root.children.forEach(collapse)

    const treeLayout = d3.tree().nodeSize([nodeSpacingX, nodeSpacingY])

    function update(source) {
      const duration = 750
      const treeData = treeLayout(root)
      const nodes = treeData.descendants()
      const links = treeData.links()

      nodes.forEach((d) => (d.y = d.depth * nodeSpacingY))

      const link = g.selectAll(".link").data(links, (d) => d.target.data.title)

      const linkEnter = link.enter().insert("g", "g").attr("class", "link")

      linkEnter.append("path")
        .attr("class", "link-base")
        .attr("fill", "none")
        .attr("stroke", "#A4B6C1")
        .attr("stroke-width", linkStrokeWidth)
        .attr("opacity", 0.6)
        .attr("stroke-linecap", "round")
        .attr("d", (d) => {
          const o = {x: source.x0, y: source.y0}
          return diagonal({source: o, target: o})
        })

      linkEnter.append("path")
        .attr("class", "link-overlay")
        .attr("fill", "none")
        .attr("stroke", "#4A7AB8")
        .attr("stroke-width", linkOverlayWidth)
        .attr("opacity", 0.5)
        .attr("stroke-linecap", "round")
        .attr("d", (d) => {
          const o = {x: source.x0, y: source.y0}
          return diagonal({source: o, target: o})
        })

      const linkUpdate = linkEnter.merge(link)

      linkUpdate.select(".link-base")
        .transition()
        .duration(duration)
        .attr("d", diagonal)

      linkUpdate.select(".link-overlay")
        .transition()
        .duration(duration)
        .attr("d", diagonal)

      link.exit()
        .transition()
        .duration(duration)
        .attr("opacity", 0)
        .remove()

      const node = g.selectAll(".node").data(nodes, (d) => d.data.title)

      const nodeEnter = node.enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d) => `translate(${source.x0},${source.y0})`)
        .on("click", (event, d) => {
          event.stopPropagation()
          scrollToTree()

          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current)
            hoverTimeoutRef.current = null
          }

          if (d.data.visualization) {
            const circle = d3.select(event.currentTarget).select("circle").node()
            const rect = circle.getBoundingClientRect()

            if (popover.visible && popover.node?.title === d.data.title) {
              setPopover({ visible: false, node: null, x: 0, y: 0 })
              currentNodeRef.current = null

              if (d.parent) {
                d.parent.children?.forEach((child) => {
                  if (child !== d) collapse(child)
                })
              }

              if (d.children) {
                d._children = d.children
                d.children = null
              } else {
                d.children = d._children
                d._children = null
              }
              update(root)
            } else {
              currentNodeRef.current = d.data.title
              setPopover({
                visible: true,
                node: d.data,
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
              })
            }
          } else {
            setPopover({ visible: false, node: null, x: 0, y: 0 })
            currentNodeRef.current = null

            if (d.parent) {
              d.parent.children?.forEach((child) => {
                if (child !== d) collapse(child)
              })
            }

            if (d.children) {
              d._children = d.children
              d.children = null
            } else {
              d.children = d._children
              d._children = null
            }
            update(root)
          }

          if (firstTime) {
            setFirstTime(false)
            localStorage.setItem('treeInteracted', 'true')
            if (onInteraction) onInteraction()
          }
        })
        .on("mouseenter", function(event, d) {
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current)
            hoverTimeoutRef.current = null
          }

          if (d.data.visualization) {
            currentNodeRef.current = d.data.title
            const circle = d3.select(this).select("circle").node()
            const rect = circle.getBoundingClientRect()

            setPopover({
              visible: true,
              node: d.data,
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2
            })
          }
        })
        .on("mouseleave", (event, d) => {
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current)
          }
          hoverTimeoutRef.current = setTimeout(() => {
            if (!isMouseOverPopoverRef.current && currentNodeRef.current === d.data.title) {
              setPopover({ visible: false, node: null, x: 0, y: 0 })
              currentNodeRef.current = null
            }
          }, 300)
        })

      // Pulse ring for root node (first time)
      nodeEnter.each(function(d) {
        if (d.depth === 0 && firstTime) {
          const nodeGroup = d3.select(this)
          const radius = nodeBaseRadius + Math.max(0, 3 - d.depth) * nodeDepthBonus

          nodeGroup.append("circle")
            .attr("class", "root-pulse-ring")
            .attr("r", radius + 10)
            .attr("fill", "none")
            .attr("stroke", "#940F15")
            .attr("stroke-width", strokeWidth)
            .attr("opacity", 0)
            .style("pointer-events", "none")

          function pulse() {
            nodeGroup.select(".root-pulse-ring")
              .transition()
              .duration(1500)
              .attr("r", radius + 35)
              .attr("opacity", 0.8)
              .transition()
              .duration(1500)
              .attr("r", radius + 10)
              .attr("opacity", 0)
              .on("end", pulse)
          }

          pulse()
        }
      })

      nodeEnter.append("circle")
        .attr("r", (d) => nodeBaseRadius + Math.max(0, 3 - d.depth) * nodeDepthBonus)
        .attr("fill", (d) => d._children ? "#4A7AB8" : "#4A7AB8")
        .attr("stroke", "none")
        .attr("stroke-width", "0")
        .style("cursor", "pointer")
        .style("filter", (d) => d.depth === 0 && firstTime ? "drop-shadow(0 0 10px #940F15)" : "none")

      nodeEnter.each(function(d) {
        if (d._children) {
          const nodeGroup = d3.select(this)
          const radius = nodeBaseRadius + Math.max(0, 3 - d.depth) * nodeDepthBonus

          nodeGroup.append("circle")
            .attr("class", "expand-indicator")
            .attr("r", radius * 0.35)
            .attr("fill", "none")
            .attr("stroke", "#7FA8D8")
            .attr("stroke-width", "4px")
            .attr("pointer-events", "none")
        }
      })

      nodeEnter.each(function(d) {
        const nodeGroup = d3.select(this)
        const radius = nodeBaseRadius + Math.max(0, 3 - d.depth) * nodeDepthBonus
        const labelY = radius + labelSpacing
        const maxWidth = d.depth === 0 ? rootMaxLabelWidth : maxLabelWidth
        const fontSize = d.depth === 0 ? rootFontSize : baseFontSize
        const currentLineHeight = d.depth === 0 ? rootLineHeight : lineHeight

        const words = d.data.title.split(/\s+/)
        const lines = []
        let currentLine = words[0]

        const tempText = nodeGroup.append("text")
          .attr("font-family", "Montserrat, system-ui, sans-serif")
          .attr("font-size", `${fontSize}px`)
          .attr("font-weight", d.depth === 0 ? "700" : "600")
          .style("visibility", "hidden")

        for (let i = 1; i < words.length; i++) {
          const testLine = currentLine + " " + words[i]
          tempText.text(testLine)
          const testWidth = tempText.node().getComputedTextLength()

          if (testWidth > maxWidth) {
            lines.push(currentLine)
            currentLine = words[i]
          } else {
            currentLine = testLine
          }
        }

        lines.push(currentLine)
        tempText.remove()

        const textGroup = nodeGroup.append("g").attr("class", "node-label")

        lines.forEach((line, i) => {
          const yOffset = labelY + (i * currentLineHeight)

          const text = textGroup.append("text")
            .attr("x", 0)
            .attr("y", yOffset)
            .attr("text-anchor", "middle")
            .attr("font-family", "Montserrat, system-ui, sans-serif")
            .attr("font-size", `${fontSize}px`)
            .attr("font-weight", d.depth === 0 ? "700" : "600")
            .attr("fill", "#2E598F")
            .attr("opacity", 0.95)
            .style("pointer-events", "none")
            .text(line)

          text.style("paint-order", "stroke")
            .style("stroke", "#EBEAD9")
            .style("stroke-width", isMobile ? "2px" : "4px")
            .style("stroke-linecap", "round")
            .style("stroke-linejoin", "round")
        })

        if (d.depth === 0 && firstTime) {
          const hintFontSize = isMobile ? 12 : isTablet ? 14 : 18

          const clickHereText = textGroup.append("text")
            .attr("class", "click-here-hint")
            .attr("x", 0)
            .attr("y", labelY + (lines.length * currentLineHeight) + 35)
            .attr("text-anchor", "middle")
            .attr("font-family", "Roboto, system-ui, sans-serif")
            .attr("font-size", `${hintFontSize}px`)
            .attr("font-weight", "700")
            .attr("fill", "#940F15")
            .style("pointer-events", "none")
            .text("↑ Click here to explore")

          function blink() {
            clickHereText
              .transition()
              .duration(800)
              .attr("opacity", 0.2)
              .transition()
              .duration(800)
              .attr("opacity", 1)
              .on("end", blink)
          }

          blink()
        }
      })

      const nodeUpdate = nodeEnter.merge(node)

      nodeUpdate.transition()
        .duration(duration)
        .attr("transform", (d) => `translate(${d.x},${d.y})`)

      nodeUpdate.select("circle")
        .attr("fill", (d) => d._children ? "#4A7AB8" : "#4A7AB8")
        .attr("stroke", (d) => d.depth === 0 && firstTime ? "#940F15" : "#2E598F")
        .attr("stroke-width", (d) => d.depth === 0 && firstTime ? strokeWidth + 2 : strokeWidth)

      nodeUpdate.select(".expand-indicator").remove()

      nodeUpdate.each(function(d) {
        if (d._children) {
          const nodeGroup = d3.select(this)
          const radius = nodeBaseRadius + Math.max(0, 3 - d.depth) * nodeDepthBonus

          nodeGroup.append("circle")
            .attr("class", "expand-indicator")
            .attr("r", radius * 0.35)
            .attr("fill", "none")
            .attr("stroke", "#7FA8D8")
            .attr("stroke-width", "4px")
            .attr("pointer-events", "none")
        }
      })

      node.exit()
        .transition()
        .duration(duration)
        .attr("transform", (d) => `translate(${source.x},${source.y})`)
        .remove()

      node.exit().select("circle")
        .attr("r", 1e-6)

      nodes.forEach((d) => {
        d.x0 = d.x
        d.y0 = d.y
      })
    }

    function diagonal(d) {
      return `M${d.source.x},${d.source.y} C${d.source.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${d.target.y}`
    }

    function collapse(d) {
      if (d.children) {
        d._children = d.children
        d._children.forEach(collapse)
        d.children = null
      }
    }

    update(root)

    svg.on("click", () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
      setPopover({ visible: false, node: null, x: 0, y: 0 })
      currentNodeRef.current = null
    })
  }, [firstTime, onInteraction])

  const handlePopoverMouseEnter = () => {
    isMouseOverPopoverRef.current = true
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
  }

  const handlePopoverMouseLeave = () => {
    isMouseOverPopoverRef.current = false
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setPopover({ visible: false, node: null, x: 0, y: 0 })
      currentNodeRef.current = null
    }, 1500)
  }

  return (
    <>
      <svg ref={svgRef}></svg>
      {popover.visible && popover.node && (
        <EnhancedPopover
          node={popover.node}
          x={popover.x}
          y={popover.y}
          onClose={handleClosePopover}
          onMouseEnter={handlePopoverMouseEnter}
          onMouseLeave={handlePopoverMouseLeave}
        />
      )}
    </>
  )
}

export default TreeChartWithPopovers
