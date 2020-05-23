import {
  fetchData,
  fetchDataFulfilled,
  fetchDataRejected,
} from '../../stores/actions/people.action'
import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

export const getPeople = () => {
  //IN order to use await your callback must be asynchronous using async keyword.
  return async (dispatch: Function) => {
    //Then perform your asynchronous operations.
    try {
      //Have it first fetch data from our starwars url.
      const starWarsPromise = await fetch('https://swapi.co/api/people')
      dispatch(fetchData(true))
      //Then use the json method to get json data from api/
      const people = await starWarsPromise.json()
      console.log('people-----------', people)
      //Now when the data is retrieved dispatch an action altering redux state.
      dispatch(fetchDataFulfilled(people.results))
    } catch (error) {
      console.log('Getting People Error---------', error)
      dispatch(fetchDataRejected(error))
    }
  }
}

class Demo extends Component {
  componentDidMount() {
    this.props.getPeople()
  }
  render() {
    const { people, loading } = this.props
    console.log('eople', people)
    if (!loading) {
      return (
        <View style={styles.container}>
          {people.length ? (
            people.map((person, i) => <Text key={i}>{person.name}</Text>)
          ) : (
            <Text>No People</Text>
          )}
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Loading...........</Text>
        </View>
      )
    }
  }
}
//Map the redux state to your props.
const mapStateToProps = state => ({
  people: state.people.people,
  loading: state.people.loading,
})

//Map your action creators to your props.
const mapDispatchToProps = {
  getPeople,
}

//export your list as a default export
export default connect(mapStateToProps, mapDispatchToProps)(Demo)
//Define your styles by using StyleSHeet from react-native to cerate a css abstraction
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
