import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMoocDetail, setLoading } from '../actions';
import { Spin } from 'antd'; 

var _id;

function initChild(o,c) {
  if (( typeof(o) != 'undefined' )&&( o !== null)) {
    return o[c]
  }else{
    return [];
  }
}


class Mooc extends Component {

  componentDidMount = () =>{
    _id = this.props.match.params.id;
    // this.props.loading = true;
    this.props.getMoocDetail(_id);
  }

  doReturn = () =>{
    this.props.history.push('/')
  }

  render() {
    console.log(this.props.detail)
    const detail = initChild(this.props.detail, "content");
    const title = initChild(this.props.detail, "title");
    var loading = this.props.loading;

    return (
      <div className="g-mooc">
        <div className="loading"><Spin spinning={loading}/></div>
        <div className="menu">
          <div className="chap"> {title}</div>
          <div className="return" onClick={this.doReturn}>返回</div>
        </div>
        <div className="markdown-body" dangerouslySetInnerHTML = {{ __html:detail }}></div>
      </div>
      
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMoocDetail: (id) => {
      dispatch( setLoading() );
      dispatch( fetchMoocDetail(id) );
    }
  }
}

const mapStateToProps = (state) => ({
  detail: state.detail,
  loading: state.loading
})

export default connect(mapStateToProps,mapDispatchToProps)(Mooc);
