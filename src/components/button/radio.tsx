/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';

interface RadioButtonDataItem {
    label: string;
    value: string | number;
}

interface RadioButtonProps {
    data: RadioButtonDataItem[];
    onSelect: (value: string | number) => void;
    defaultValue?: string | number | null;
}

const RadioButton: React.FC<RadioButtonProps> = ({ data, onSelect, defaultValue }) => {
    const [userOption, setUserOption] = useState<string | number | null>(null);

    useEffect(() => {
        if (defaultValue !== undefined && userOption === null) {
            setUserOption(defaultValue);
        }
    }, [defaultValue]);

    const renderItem = ({ item, index }: { item: RadioButtonDataItem, index: number }) => (
        <TouchableOpacity
            style={styles.radContainer}
            onPress={() => {
                setUserOption(item.value);
                onSelect(item.value);
            }}
            key={index}
        >
            <View style={[styles.radContainerInner, (item.value === userOption) && { backgroundColor: '#F0FFFF', borderRadius: 10 }]}>
                <Text style={[styles.radLabel, { color: item.value === userOption ? '#0063B9' : "#212121" }]}>{item.label}</Text>
                <View
                    style={[styles.radStyleOuter, {
                        borderColor: item.value === userOption ? '#0063B9' : '#808080',
                    }]}
                >
                    {
                        item.value === userOption ?
                            <View style={styles.radStyleInner} />
                            : null
                    }
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ width: "100%", marginVertical: 5 }}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.value.toString()}
                style={styles.listStyle}
                contentContainerStyle={styles.listContainer}
                horizontal={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    listStyle: { marginHorizontal: 10 },
    listContainer: { width: "95%", justifyContent: "space-between", alignItems: "center", },
    radLabel: { fontSize: 12, fontWeight: "bold", marginRight: 10, },
    radStyleOuter: {
        height: 20,
        width: 20,
        borderRadius: 12,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
    },
    radStyleInner: {
        height: 10,
        width: 10,
        borderRadius: 6,
        backgroundColor: "#0063B9",
    },
    radContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    radContainerInner: { flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: 90, paddingHorizontal: 5 }
});

export default RadioButton;