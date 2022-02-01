import React, {Component} from 'react'

export default class Header extends Component {
    render() {
        const {username} = this.props
        return (
            <div className='row mb-5 justify-content-between'>
                <div className={username && 'col-3'}>
                    <h1 className={!username ? 'display-3' : 'display-4'}>catch10</h1>
                </div>
                { username && (
                    <div className='col-3'>
                        <h1 className='display-5'>Welcome, {username}</h1>
                    </div>
                )} 
                <p className='container-fluid' style={{height: '0.5px', border: '1px solid gray'}}></p>
            </div>
        )
    }
}
