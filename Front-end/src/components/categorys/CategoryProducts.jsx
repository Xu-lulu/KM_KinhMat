// import { useState, useEffect } from "react";
// import { Link, NavLink, useParams } from "react-router-dom";
// import axios from "axios";
// import ProductsCart from "../Products/ProductCard";
// import "../Products/Productscard.scss";
// import { Toaster, toast } from "sonner";
// import { useSelector, useDispatch } from "react-redux";
// import { findCategorys } from "../../redux/api/apiProduct";
// import BanNer from "../baner/baner";
// import { datacategory, datafindcategory } from "../../common/dataReux";

// const CategoryProducts = () => {
//   const { name } = useParams();
//   const [data, setdata] = useState([]);
//   const [loading, setloading] = useState(true);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     findCategorys(dispatch, name);
//   }, [dispatch]);
//   const dataCategory = datacategory();
//   const datafincategory = datafindcategory();
//   return (
//     <>
//       <div className="product">
//         {/* <BanerProducts></BanerProducts> */}
//         <BanNer className="category-banner" />
//         <div>
//           <nav className="navbarpro">
//             <Link exact={true} className="btn" to="/products" active="active">
//               {" "}
//               All
//             </Link>
//             {dataCategory.map((item, index) => {
//               return (
//                 <NavLink
//                   className="btn"
//                   key={index}
//                   to={`/products/category/${item.Namecategory}`}
//                   // active="active"
//                 >
//                   {item.Namecategory}
//                 </NavLink>
//               );
//             })}
//           </nav>{" "}
//         </div>
//         <div>
//           {datafincategory ? (
//             <div className="alldataproduct row row-cols-4 gy-1 p-5">
//               {datafincategory.map((product, index) => {
//                 return (
//                   <div className="product-card p-1" key={index}>
//                     <ProductsCart
//                       _id={product._id}
//                       Name={product.Name}
//                       Price={product.Price}
//                       Description={product.Description}
//                       Image={product.Image}
//                       Count={product.count}
//                       Category={product.Category}
//                     />
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <p>Loading</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };
// export default CategoryProducts;
