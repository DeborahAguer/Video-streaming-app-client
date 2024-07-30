import classes from "../../styles/LightLoadingSpinner.module.css";

const LightLoadingSpinner = ({ className }: any) => {
  const allClasses = `${classes.loader} ${className}`;
  return <div className={allClasses}></div>;
};

export default LightLoadingSpinner;
