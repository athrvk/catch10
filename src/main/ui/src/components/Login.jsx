import React, {Component} from 'react'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ""
        }
    }

    componentDidMount() {
        window.scroll(0, 0);
    }

    handleClick = e => {
        e.preventDefault()
        this.props.setUsername(this.state.username);
    }

    render() {
        return (
            <div className='container'>
                <form className='row' autoComplete={'off'}>
                    <div className='col-md-2'></div>
                    <div className='col-md-2'></div>
                    <div className='form-floating col-md-2'>
                        <input className='form-control'
                               value={this.state.username}
                               id="floatingInput"
                               style={{
                                   textAlign: "left",
                                   zoom: '0.8'
                               }}
                               placeholder="username"
                               autoFocus={true}
                               onChange={e => this.setState({username: e.target.value})}
                        />
                        <label htmlFor="floatingInput" style={{paddingLeft: '1.9rem', zoom: '0.8'}}>Username</label>
                    </div>
                    <div className='col-md-2'>
                        <button className='btn btn-primary mt-1'
                                disabled={!this.state.username}
                                onClick={this.handleClick}>Login</button>
                    </div>
                </form>
            </div>
        )
    }
}
