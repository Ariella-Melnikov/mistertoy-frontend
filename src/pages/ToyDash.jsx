import { useSelector } from 'react-redux'

import { ToyChart } from '../cmps/ToyChart.jsx'
import { useEffect } from 'react'
import { loadToys } from '../store/actions/toy.actions.js'

export function ToyDash() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  console.log('Toys:', toys)

  useEffect(() => {
    loadToys()
      .catch(err => {
        console.log('err:', err)
        showErrorMsg('Cannot load toys')
      })
  }, [])

  function totalPricesPerLabel() {
    const totalPricesPerLabel = toys.reduce((acc, toy) => {
      toy.labels.forEach((label) => {
        acc[label] = (acc[label] || 0) + toy.price
      })
      return acc
    }, {})

    const labels = Object.keys(totalPricesPerLabel)
    const dataValues = Object.values(totalPricesPerLabel)

    return { labels, dataValues }
  }

  function inStockPercentageByLabel() {
    const labelCounts = toys.reduce((acc, toy) => {
      toy.labels.forEach((label) => {
        if (!acc[label]) {
          acc[label] = { total: 0, inStock: 0 }
        }
        acc[label].total += 1
        if (toy.inStock) {
          acc[label].inStock += 1
        }
      })
      return acc
    }, {})

    const labels = Object.keys(labelCounts)
    const dataValues = labels.map((label) => {
      const count = labelCounts[label]
      return (count.inStock / count.total) * 100
    })

    return { labels, dataValues }
  }

  return (
    <section className='toy-dash'>
      <div className='toy-chart-container'>
        <h2>Total price by label</h2>
        <ToyChart {...totalPricesPerLabel()} />
      </div>
      <div className='toy-chart-container'>
        <h2>In stock by label</h2>
        <ToyChart {...inStockPercentageByLabel()} />
      </div>
    </section>
  )
}
