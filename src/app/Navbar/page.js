import Link from 'next/link'; // or { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="bg-transparent shadow-lg">
      <ul className="p-2 flex flex-row gap-6 justify-end items-center">
        <li className="gaming-link">
          <Link href="/">Home</Link>
        </li>
        <li className="gaming-link">
          <Link href="/Typing">Typing</Link>
        </li>
        <li className="gaming-link">
          <Link href="/Login">Arcade</Link>
        </li>
        <li className="gaming-link">
          <Link href="/LeaderBoard">LeaderBoard</Link>
        </li>
        <li className="gaming-link">
          <Link href="/Profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
}
