import classes from "../../styles/DarkLoadingSpinner.module.css";

const DarkLoadingSpinner = ({ className }: any) => {
  const allClasses = `${classes.loader} ${className}`;
  return <div className={allClasses}></div>;
};

export default DarkLoadingSpinner;
