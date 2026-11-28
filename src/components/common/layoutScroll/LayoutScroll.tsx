import {ScrollView, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import type {ReactNode} from 'react';

type ILayoutScroll =
    | {
          type?: 'regular';
          children: ReactNode;
          keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
      }
    | {
          type: 'keyboard-aware';
          children: ReactNode;
          disableScrollOnKeyboardHide?: boolean;
      };

const LayoutScroll = (props: ILayoutScroll) => {
    if (props.type === 'keyboard-aware') {
        const {children, disableScrollOnKeyboardHide = false} = props;

        return (
            <KeyboardAwareScrollView
                style={style.main}
                bottomOffset={300}
                contentContainerStyle={style.contentContainerStyle}
                showsVerticalScrollIndicator={false}
                disableScrollOnKeyboardHide={disableScrollOnKeyboardHide}>
                {children}
            </KeyboardAwareScrollView>
        );
    }

    const {children, keyboardShouldPersistTaps = 'handled'} = props;

    return (
        <ScrollView
            keyboardShouldPersistTaps={keyboardShouldPersistTaps}
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
