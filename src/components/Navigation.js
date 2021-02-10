import Link from 'next/link';

const Navigation = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/about'>About</Link>
        </li>
        <li>
          <Link href='/post/1/comment1'>Post 1</Link>
        </li>
        <li>
          <Link href='/post/2/Comment2'>Post 2</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
