import Header from '../Header/Header.jsx';
import { Outlet } from 'react-router-dom';
import UserAccountLayout from '../UserAccountLayout/UserAccountLayout.jsx';


export default function PrivateLayout() {
  return <UserAccountLayout />
}
// export default function PrivateLayout() {
//   return (
//     <>
//       <Header />
//       <Outlet />
//     </>
//   );
// }


// export default function PrivateLayout() {
//   return (
//     <div className="private-layout">
//       <Header />
//       <div className="content-wrapper">
//         <Sidebar />
//         <main className="main-content">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
