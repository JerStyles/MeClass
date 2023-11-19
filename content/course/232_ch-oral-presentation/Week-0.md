---
editable: false
pager: false
title: Week 0 知識萃取
date: '2021-01-01'
type: book
slides:
  theme: black # Reveal JS theme name
  highlight_style: dracula # Highlight JS theme name
weight: 1
---

Build a foundation in Python.

<!--more-->
{{<toc>}}
{{< icon name="clock" pack="fas" >}} 1-2 hours per week, for 8 weeks
{{< audio src="https://download.samplelib.com/mp3/sample-3s.mp3">}}
{{% callout note %}}
A Markdown callout is useful for displaying notices, hints, or definitions to your readers.
{{% /callout %}}
```mermaid
gantt
  dateFormat  YYYY-MM-DD
  section Section
  A task           :a1, 2014-01-01, 30d
  Another task     :after a1  , 20d
  section Another
  Task in sec      :2014-01-12  , 12d
  another task      : 24d
```

```markmap {height="200px"}
- Hugo Modules
  - blox-tailwind
  - blox-plugins-netlify
  - blox-plugins-netlify-cms
  - blox-plugins-reveal
```
## Learn

{{< youtube rfscVS0vtbw >}}

## Quiz

{{< spoiler text="What is the difference between lists and tuples?" >}}
Lists

- Lists are mutable - they can be changed
- Slower than tuples
- Syntax: `a_list = [1, 2.0, 'Hello world']`

Tuples

- Tuples are immutable - they can't be changed
- Tuples are faster than lists
- Syntax: `a_tuple = (1, 2.0, 'Hello world')`
  {{< /spoiler >}}

{{< spoiler text="Is Python case-sensitive?" >}}
Yes
{{< /spoiler >}}


