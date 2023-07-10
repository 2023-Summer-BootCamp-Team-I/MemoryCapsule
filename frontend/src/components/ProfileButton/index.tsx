interface User {
  img: string;
  role: string;
  name: string;
}
function ProfileButton() {
  const user1: User = {
    img: 'https://res.heraldm.com/phpwas/restmb_idxmake.php?idx=621&simg=/content/image/2020/09/22/20200922000157_0.jpg',
    role: 'host',
    name: 'zion T',
  };

  return (
    <div className="flex items-center">
      <div className="w-16 h-16 mr-4 overflow-hidden rounded-full">
        <img src={user1.img} className="object-cover w-full h-full" alt="User Image" />
      </div>
      <div>
        <div className="text-base text-left">{user1.role}</div>
        <div className="text-2xl text-left">{user1.name}</div>
      </div>
    </div>
  );
}
export default ProfileButton;
