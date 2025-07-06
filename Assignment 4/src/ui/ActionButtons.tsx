type Props = {
    name:string,
    color:string,
    action?: ()=>void
};

function ActionButtons({name,color,action}: Props) {
  return <button onClick={action} className={"btn btn-outline  rounded-full "+`${color}`}>{name}</button>;
}

export default ActionButtons;
