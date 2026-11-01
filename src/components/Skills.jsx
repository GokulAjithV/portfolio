import { Section, Tag } from './ui'
import { skills } from '../content'

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="space-y-5">
        {skills.map(({ group, items }) => (
          <div key={group}>
            <h3 className="mb-2 text-sm font-semibold">{group}</h3>
            <ul className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
