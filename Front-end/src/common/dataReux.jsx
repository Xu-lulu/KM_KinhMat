import { useSelector, useDispatch } from "react-redux";
export const useDataProduct = () => {
  return useSelector((state) => {
    const dataproductuser = state?.products?.allproduct;
    if (dataproductuser && dataproductuser?.dataProducts) {
      return dataproductuser?.dataProducts;
    }
    return null;
  });
};
export const useDataProductAdmin = () => {
  return useSelector((state) => {
    const dataproductuser = state?.admin?.allproductAdmin;
    if (dataproductuser && dataproductuser?.dataProductsAdmin) {
      return dataproductuser?.dataProductsAdmin;
    }
    return null;
  });
};
export const useDataCategory = () => {
  return useSelector((state) => {
    const datacategoryuser = state?.products.categorys;
    if (datacategoryuser && datacategoryuser?.dataCategorys) {
      return datacategoryuser?.dataCategorys;
    }
    return null;
  });
};
export const useDataCategoryadmin = () => {
  return useSelector((state) => {
    const datacategoryuser = state?.products.categorys;
    if (datacategoryuser && datacategoryuser?.dataCategorys) {
      return datacategoryuser?.dataCategorys;
    }
    return null;
  });
};
export const useDataFindCategory = () => {
  return useSelector((state) => {
    const data = state?.products.findcategorys;
    if (data && data?.finddataCategorys) {
      return data?.finddataCategorys;
    }
    return null;
  });
};
export const useAccessToken = () => {
  return useSelector((state) => {
    const currentUser = state.auth.login.currentUser;
    if (currentUser && currentUser?.accessToken) {
      return currentUser.accessToken;
    }
    return null;
  });
};
export const useDataUser = () => {
  return useSelector((state) => {
    const currentUser = state?.auth?.login?.currentUser;
    if (currentUser && currentUser?.newUsers) {
      return currentUser?.newUsers;
    }
    return null;
  });
};
export const useDataCurrentUser = () => {
  return useSelector((state) => {
    const currentUser = state?.auth?.login;
    if (currentUser && currentUser?.currentUser) {
      return currentUser?.currentUser;
    }
    return null;
  });
};
export const useDataRole = () => {
  return useSelector((state) => {
    const currentUser = state?.auth?.login?.currentUser;
    if (currentUser && currentUser?.newUsers?.role) {
      return currentUser?.newUsers?.role;
    }
    return null;
  });
};
export const useDataCart = () => {
  return useSelector((state) => {
    const data = state?.cartUser?.dataCart?.dataCarts?.datacart;
    if (data && data?.cart) {
      return data?.cart;
    }
    return null;
  });
};
// export const usedataCart = () => {
//   return useSelector((state) => {
//     const data = state?.cartUser?.dataCart;
//     if (data && data?.dataCarts) {
//       return data?.dataCarts;
//     }
//     return null;
//   });
// };