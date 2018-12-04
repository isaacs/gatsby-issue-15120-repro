import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import { getHeaderHeightState, getSidebarDockedState, getSidebarState, getAnchorState } from '../../store/selectors';
import { onSetSidebarOpen } from '../../actions/sidebar'
import { onSetAnchorOpen } from '../../actions/anchor'
import SidebarContent from '../ResponsiveSidebar/SidebarContent';
import TableOfContents from '../ResponsiveAnchor/TableOfContents';

class ResponsiveTopBar extends Component {
  onSetSidebarOpen = () => {
    this.props.onSetSidebarOpen(true)
  }

  onSetSidebarClose = () => {
    this.props.onSetSidebarOpen(false)
  }

  onSetAnchorOpen = () => {
    this.props.onSetAnchorOpen(true)
  }

  onSetAnchorClose = () => {
    this.props.onSetAnchorOpen(false)
  }

  render() {
    const { headerHeight, siderbarDocked, sidebarOpen, anchorOpen } = this.props

    if (siderbarDocked) return <></>
    return (
      <div
        style={{
          position: "fixed",
          top: headerHeight,
          width: "100%",
          height: 40,
          zIndex: 1000,
          background: 'aliceblue',
          marginBottom: '1.45rem'
        }}
      >
        {!anchorOpen &&
          <div style={{
            position: "absolute",
            left: 8,
            top: 4
          }}>
            {sidebarOpen ? 
              <Button icon="close" onClick={this.onSetSidebarClose}/> :
              <Button icon="fullscreen" onClick={this.onSetSidebarOpen}/>
            }
            {sidebarOpen &&
              <div style={{
                position: "fixed",
                top: headerHeight + 40,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'white'
              }}>
                <SidebarContent />
              </div>
            }
          </div>
        }
        {!sidebarOpen &&
          <div style={{
            position: "absolute",
            right: 8,
            top: 4
          }}>
            {anchorOpen ?
              <Button icon="close" onClick={this.onSetAnchorClose}/> :
              <Button icon="dash" onClick={this.onSetAnchorOpen}/>
            }
              {anchorOpen &&
              <div style={{
                position: "fixed",
                top: headerHeight + 40,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'white'
              }}>
                <TableOfContents offsetTop={headerHeight+70}/>
              </div>
            }
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    headerHeight: getHeaderHeightState(state),
    siderbarDocked: getSidebarDockedState(state),
    sidebarOpen: getSidebarState(state).sidebarOpen,
    anchorOpen: getAnchorState(state).anchorOpen,
  }
}

const mapDispatchToProps = {
  onSetSidebarOpen,
  onSetAnchorOpen
}

export default connect(mapStateToProps, mapDispatchToProps) (ResponsiveTopBar)