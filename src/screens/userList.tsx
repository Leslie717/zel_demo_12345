/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react';
import { View, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity } from 'react-native';
import useZellerCustomers from '../utils/hooks/useZellerCust';
import { ZellerCustomer } from '../constants/zelCust';
import { useIsFocused } from '@react-navigation/native';
import RadioButton from '../components/button/radio';
import SearchBar from '../components/search/searchBar';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const RadioData = [
    { label: 'Manager', value: 'Manager' },
    { label: 'Admin', value: 'Admin' },
    { label: 'All', value: 'All' },
];
const UserListScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [filteredCustomers, setFilteredCustomers] = useState<ZellerCustomer[] | null>([]);
    const isFocused = useIsFocused();
    const [selectedValue, setSelectedValue] = useState<string | number | null>('');
    const [clicked, setClicked] = useState(false);
    // const navigation = useNavigation();
    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();


    const { loading, error, customers, data, fetchMore, refetch } = useZellerCustomers(
        selectedValue ? { role: { eq: selectedValue } } : undefined
    );


    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);

    const handleEndReached = () => {
        if (data?.listZellerCustomers?.nextToken) {
            fetchMore({
                variables: {
                    nextToken: data.listZellerCustomers.nextToken,
                },
            });
        }
    };

    const renderItem = ({ item }: { item: ZellerCustomer }) => (
        <View key={item.name} style={styles.itemContainer}>
            <View style={styles.itemInitial}>
                <Text style={styles.itemInitialText}>{item.name.charAt(0).toUpperCase()}</Text>
            </View>
            <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemType}>{item.role}</Text>
            </View>
        </View>
    );
    const listHeader = () => (
        selectedValue ?
            (<View style={{ padding: 5 }}>
                <Text style={styles.sectionTitle}>
                    {selectedValue.toString().charAt(0).toUpperCase() + selectedValue.toString().slice(1)} Users
                </Text>
            </View>)
            : null
    );


    const handleSelect = (value: string | number) => {
        setSelectedValue(value);
    };


    const handleCancel = () => {
        setSearchTerm('');
    };



    useEffect(() => {
        if (isFocused && !loading && ((selectedValue && selectedValue !== 'All') || searchTerm)) {
            let customersFiltered: React.SetStateAction<ZellerCustomer[] | null> = [];
            if (selectedValue && selectedValue !== 'All') {
                customersFiltered = customers.filter((customer) =>
                    customer.role?.toLowerCase().includes(selectedValue.toString().toLowerCase() || '')
                );
            }
            if (searchTerm) {
                customersFiltered = customers.filter((customer) =>
                    customer.name?.toLowerCase().includes(searchTerm.toString().toLowerCase() || '')
                );
            }
            setFilteredCustomers(customersFiltered);
        }
        else {
            setFilteredCustomers(customers);
        }

    }, [selectedValue, searchTerm, loading]);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }



    return (
        <View style={styles.mainContainer}>

            <View style={{ width: '80%' }}>
                <RadioButton data={RadioData} onSelect={handleSelect} defaultValue="All" />
            </View>
            <View style={styles.srchContainer}>
                <SearchBar
                    setSearchPhrase={setSearchTerm}
                    searchPhrase={searchTerm}
                    clicked={clicked}
                    setClicked={setClicked}
                    handleCanceled={handleCancel}
                />
            </View>
            <FlatList
                style={styles.listContainer}
                data={filteredCustomers}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5}
                ListHeaderComponent={listHeader}
            />
            <TouchableOpacity style={{ marginVertical:5, width:'100%', flexDirection: 'row', justifyContent: 'flex-end' }} onPress={() => navigate('Home')}>
                <View style={{ padding: 3, width: 100, backgroundColor: '#F0FFFF', }}>
                    <Text style={{ fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
                        Go Home
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    listContainer: { backgroundColor: '#E8E8E8', width: '95%', borderRadius: 15, marginVertical: 8, padding: 5 },
    srchContainer: { width: '90%', backgroundColor: '#E8E8E8', borderRadius: 15 },
    itemContainer: {
        padding: 5, marginHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 16,
    },
    itemInitial: {
        backgroundColor: '#F0FFFF',
        padding: 8,
        borderRadius: 15,
        marginRight: 10,
        width: 60,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemInitialText: {
        fontSize: 16,
        textAlign: 'auto',
        fontWeight: 'bold',
        color: '#0063B9'
    },
    itemName: {
        fontSize: 16,
        color: '#0063B9'
    },
    itemType: {
        fontSize: 14,
        color: 'gray',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default UserListScreen;