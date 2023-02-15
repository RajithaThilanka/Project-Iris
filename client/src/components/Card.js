import propTypes from 'prop-types'
import { FaUmbraco } from 'react-icons/fa'

function Card ({children,reverse}){
    return (
        <div className = {`card ${reverse && 'reverse'}`}>
            {children}
        </div>
    )
    
}
Card.defaultProps{
    reverse:false
}

Card.propTypes{
    reverse:false
    children: PropTypes.node.isRequired,
}

export default Card;