const Card = ({ children, className = '' }) => {
    return (
      <div className={`bg-white shadow-sm rounded-lg p-6 ${className}`}>
        {children}
      </div>
    );
  };
  
  export default Card;