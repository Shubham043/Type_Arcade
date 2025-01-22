export default function navbar(){
    return(
        <div className="bg-transparent">
            <ul className="bg-transparent p-2 flex flex-row gap-4 justify-end items-center cursor-pointer">
                <li className="text-white text-center border rounded-md p-2">
                <Link href="/"> Home </Link></li>
                <li className="text-white text-center border rounded-md p-2"><Link href="/Login"> Login </Link></li>
                <li className="text-white text-center border rounded-md p-2"><Link href="/Typing"> Typing</Link></li>
                <li className="text-white text-center border rounded-md p-2"><Link href="/LeaderBoard"> LeaderBoard </Link></li>
                <li className="text-white text-center border rounded-md p-2"><Link href="/Login"> Login </Link></li>
            </ul>
        </div>
    )
}