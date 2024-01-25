import React, {useMemo} from 'react';
import {View} from 'react-native';
import type {SvgProps} from 'react-native-svg';
import * as Expensicons from '@components/Icon/Expensicons';
import IllustratedHeaderPageLayout from '@components/IllustratedHeaderPageLayout';
import LottieAnimations from '@components/LottieAnimations';
import MenuItemList from '@components/MenuItemList';
import TestToolMenu from '@components/TestToolMenu';
import Text from '@components/Text';
import TextLink from '@components/TextLink';
import useEnvironment from '@hooks/useEnvironment';
import useLocalize from '@hooks/useLocalize';
import useOnyxWipe from '@hooks/useOnyxWipe';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import Navigation from '@libs/Navigation/Navigation';
import * as Report from '@userActions/Report';
import type {TranslationPaths} from '@src/languages/types';
import ROUTES from '@src/ROUTES';
import SCREENS from '@src/SCREENS';

type BaseMenuItem = {
    translationKey: TranslationPaths;
    icon: React.FC<SvgProps>;
    action: () => void;
};

function TroubleshootingPage() {
    const {translate} = useLocalize();
    const theme = useTheme();
    const styles = useThemeStyles();
    const {isProduction} = useEnvironment();
    const wipeOnyx = useOnyxWipe();

    const menuItems = useMemo(() => {
        const baseMenuItems: BaseMenuItem[] = [
            {
                translationKey: 'initialSettingsPage.troubleshooting.resetAndRefresh',
                icon: Expensicons.RotateLeft,
                action: () => wipeOnyx(),
            },
            {
                translationKey: 'initialSettingsPage.troubleshooting.viewConsole',
                icon: Expensicons.Gear,
                action: () => {},
            },
        ];

        return baseMenuItems.map((item) => ({
            key: item.translationKey,
            title: translate(item.translationKey),
            icon: item.icon,
            onPress: item.action,
        }));
    }, [translate, wipeOnyx]);

    return (
        <IllustratedHeaderPageLayout
            title={translate('initialSettingsPage.aboutPage.troubleshooting')}
            onBackButtonPress={() => Navigation.goBack(ROUTES.SETTINGS_ABOUT)}
            backgroundColor={theme.PAGE_THEMES[SCREENS.SETTINGS.TROUBLESHOOTING].backgroundColor}
            illustration={LottieAnimations.Desk}
        >
            <View style={[styles.settingsPageBody, styles.ph5]}>
                <Text style={[styles.textHeadline, styles.mb1]}>{translate('initialSettingsPage.aboutPage.troubleshooting')}</Text>
                <Text style={styles.mb4}>
                    <Text>{translate('initialSettingsPage.troubleshooting.description')}</Text>{' '}
                    <TextLink
                        style={styles.link}
                        onPress={() => Report.navigateToConciergeChat()}
                    >
                        {translate('initialSettingsPage.troubleshooting.submitBug')}
                    </TextLink>
                </Text>
            </View>
            <MenuItemList
                menuItems={menuItems}
                shouldUseSingleExecution
            />
            {/* Enable additional test features in non-production environments */}
            {!isProduction && (
                <View style={[styles.ml5, styles.mr8, styles.mt6]}>
                    <TestToolMenu />
                </View>
            )}
        </IllustratedHeaderPageLayout>
    );
}

export default TroubleshootingPage;
