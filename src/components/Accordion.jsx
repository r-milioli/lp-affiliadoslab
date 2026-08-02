import { useId, useRef, useState } from 'react'
import { IconChevron } from './Icons'

export default function Accordion({ items }) {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState(null)
  const panelRefs = useRef([])

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const panelId = `${baseId}-panel-${index}`
        const triggerId = `${baseId}-trigger-${index}`
        const maxHeight = isOpen
          ? `${panelRefs.current[index]?.scrollHeight || 400}px`
          : undefined

        return (
          <div key={item.q} className={`acc-item${isOpen ? ' is-open' : ''}`}>
            <button
              type="button"
              id={triggerId}
              className="acc-trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{item.q}</span>
              <IconChevron />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="acc-panel"
              ref={(el) => {
                panelRefs.current[index] = el
              }}
              style={{ maxHeight }}
            >
              <div className="acc-panel-inner">{item.a}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
