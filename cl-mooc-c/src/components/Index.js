import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMoocList } from '../actions';
import history from '../history';
import { Spin, Icon } from 'antd'; 


function init(o) {
  if ( typeof(o) != 'undefined'  ) {
    return o;
  }else{
    return [];
  }
}

class Index extends Component {

  componentDidMount = () =>{
    this.props.getMoocList();
  }

  doClick = () => {
    this.props.toMooc();
  }

  render() {
    var lists= init(this.props.list);
    var toMooc = this.props.toMooc;
    var loading = this.props.loading;

    return (
      <div className="App-wrap">
        <div className="loading"><Spin spinning={loading}/></div>
        <div className="cnt">
          <a href="static/cl-index.pdf" target="_blank" className="card">
            <div><Icon type="bars" /> 教学大纲</div>
          </a>
          <a href="static/teach.pdf" target="_blank" className="card"><div><Icon type="file" /> 课程教案</div></a>
          <a href="static/lp.pdf" target="_blank" className="card"><div><Icon type="schedule" />  教学进度表</div></a>
          <a href="static/ep.pdf" target="_blank" className="card"><div><Icon type="schedule" /> 实验进度表</div></a>
          
        </div>
        <div className="mooc">
          {lists.map((item,key)=>{
            return (
              <li className="card" key={key}>
                <div className="mooc-tl">{item.name}</div>
                <div className="mooc-cnt">
                  {item.list.map((chaps,key)=>{
                    return (
                      <a href="#" key={key} id={chaps.id} onClick={toMooc.bind(this)}><label>{key+1}. {chaps.name}</label></a>
                    )
                  })}
                </div>
              </li>
            )
          })}
        </div>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMoocList: () => {
      
      dispatch( fetchMoocList() );
    },
    toMooc: (e) => {
      var id = e.currentTarget.id;
      history.push(`/mooc/${id}`);
    }
  }
}

const mapStateToProps = (state) => ({
  list: state.data,
  loading: state.loading
})

export default connect(mapStateToProps,mapDispatchToProps)(Index);
