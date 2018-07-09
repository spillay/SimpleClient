import React from 'react'
import Architecture from '../images/1.png'
import lifecycle from '../images/lifecycles.png'


class Home extends React.Component {

  render () {
	  console.log('Hi.....')

	  return (
		<div>
			  <main role='main' className='container pt-7'>
			  <img src={lifecycle} className="img-fluid" alt="lifecycle" />
	  <img src={Architecture} className="img-fluid" alt="Architecture" />
			  </main>
			  </div>

    )
  }

}

export default Home
