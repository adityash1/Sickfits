import PropTypes from 'prop-types'

const Page = ({children, ...props}) => {
  return (
    <div>
        <h2>Its a page component</h2>
        {children}
    </div>
  )
}

Page.propTypes = {
    children: PropTypes.node.isRequired
}

export default Page