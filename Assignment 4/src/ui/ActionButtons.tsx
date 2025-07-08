type Props = {
    name:string,
    color:string,
    disabled?:boolean,
    action?: ()=>void
};

function ActionButtons({name,color,action,disabled=false}: Props) {
  return <button disabled={disabled} onClick={action} className={"btn btn-outline  rounded-full "+`${color}`}>{name}</button>;
}

export default ActionButtons;
