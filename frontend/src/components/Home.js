import React from 'react'

const Home = () => (
  <div className="category" style={{ textAlign: 'center' }}>
    <h2>Wardrobe</h2>
    <p>Welcome to the Wardrobe-webapp!</p>
    <p>Select a product category from the sidebar to the left.</p>
    <p>
      Use the
      <span style={{ fontWeight: 'bold' }}> Update</span>
      -button above to get updated data from BadApi.
      The data is updated automatically once every hour.
    </p>
  </div>
)

export default Home
