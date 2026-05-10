import {ScrollView, StyleSheet} from 'react-native';

const LayoutScroll = ({children}) => {
    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={style.main}
            contentContainerStyle={style.contentContainerStyle}>
            {children}
        </ScrollView>
    );
};
export default LayoutScroll;

const style = StyleSheet.create({
    main: {
        flex: 1,
    },
    contentContainerStyle: {
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
});
