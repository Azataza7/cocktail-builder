import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Cocktail, User } from "../../types";
import { selectCocktailLoading, selectCocktails } from "./cocktailsSlice";
import { getCocktails } from "./cocktailsThunks";
import { CircularProgress, Grid } from "@mui/material";
import { selectUser } from "../users/usersSlice";
import CocktailItem from "./cocktaiIItem";

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const cocktailList: Cocktail[] = useAppSelector(selectCocktails);
  const onLoadingCocktail = useAppSelector(selectCocktailLoading);
  const user: User | null = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(getCocktails(user));
  }, [dispatch, user])

  console.log(cocktailList, user);


if (onLoadingCocktail) {
  return <CircularProgress/>;
}

const cocktailsContainer: JSX.Element[] = cocktailList.map((cocktailItem) => (
  <CocktailItem key={cocktailItem._id} cocktailItem={cocktailItem} />
))

  return (
    <>
    <Grid component='div' sx={{
      display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2, flexWrap: 'wrap', gap: 2}}>
      {cocktailsContainer}
    </Grid>
    </>
  );
};

export default Cocktails;