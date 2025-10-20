import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DrawShapeSvg from '../../assets/images/svg/DrawerShapeSvg';
import BurgerSvg from '../../assets/images/svg/BurgerSvg';
import {Fonts} from '../../constants/Fonts';
import {Colors} from '../../constants/Colors';

export default function CustomDrawer(props: any) {
    const {navigation} = props;
    return (
        <View style={{flex: 1}}>
            <DrawShapeSvg />
            <TouchableOpacity onPress={() => navigation.closeDrawer()} style={styles.burgerBtn}>
                <BurgerSvg />
            </TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.itemText}>Ustawienia</Text>
                <View style={styles.separator} />
                <Text style={styles.itemText}>Moje konto</Text>
                <View style={styles.separator} />
                <Text style={styles.itemText}>Moje konto</Text>
                <View style={styles.separator} />
                <Text style={styles.itemText}>Moje konto</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    burgerBtn: {
        position: 'absolute',
        zIndex: 1,
        right: 0,
        top: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        position: 'absolute',
        top: 150,
        right: 0,
    },
    itemText: {
        fontFamily: Fonts.regular,
        color: Colors.white,
        fontSize: 20,
    },
    separator: {
        height: 1,
        width: 150,
        backgroundColor: '#4E4E4E',
        marginVertical: 30,
    },
});
