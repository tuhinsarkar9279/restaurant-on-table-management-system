function Btn(props){

    return(
        <div className=""><button className="bg-yellow-400 text-black px-3 py-2 rounded-3 align-middle">
  {props.icon} {props.name}
</button></div>
    )

}

export default Btn