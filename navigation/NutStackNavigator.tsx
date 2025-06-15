import { createStackNavigator } from "@react-navigation/stack";

export type NutStackList = {
    NutList: undefined,
    ExList: undefined,

    EditNut: {nut: any},
    EditEx: {ex:any},
}

const Stack = createStackNavigator<NutStackList>();