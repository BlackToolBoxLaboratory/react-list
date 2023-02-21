import React, { useState, useEffect, useRef, useContext } from 'react';
import classnames from 'classnames';

import getStyle from '../utils/getStyle.js';
import { EnvContext, EventContext } from '../utils/useContext.js';

const ListLayer = (props) => {
  let result = [];
  props.subdataList.map((entry) => {
    if (entry.defaultCollapsed === true) {
      result.push(entry.id);
    }
  });

  const refs = {};
  const env = {
    ...useContext(EnvContext),
    state_collapsed : useCollapseState(result)
  };
  const event = useContext(EventContext);

  useEffect(() => {
    let state;
    props.subdataList.map((entry) => {
      if (entry.children) {
        state = (env.collapseEnable && entry.defaultCollapsed === true) ? 'hide' : 'show';
        event.toggleCollapsed(entry, state);
        _resizeLayer(entry.id, state);
      }
    });
  }, []);

  function _ref(id) {
    refs[id] = useRef();
    return refs[id];
  }

  function _toggleCollapsed(entry, type) {
    if (!env.collapseEnable) {
      event.clickEntry(entry);
      return false;
    }

    let state = (type) ? type : (env.state_collapsed.has(entry.id)) ? 'show' : 'hide';
    event.toggleCollapsed(entry, state);
    env.state_collapsed.onChange(entry.id, state);
    _resizeLayer(entry.id, state);
  }

  function _resizeLayer(id, state) {
    let node = refs[`${id}_sublayer`].current;
    switch (state) {
    case 'hide':
      node.style.maxHeight = '0px';
      if (props.updateLayerSize) {
        props.updateLayerSize(-1 * Math.ceil(node.scrollHeight));
      }
      break;
    case 'show':
      node.style.maxHeight = `${Math.ceil(node.scrollHeight)}px`;
      if (props.updateLayerSize) {
        props.updateLayerSize(Math.ceil(node.scrollHeight));
      }
      break;
    default:
      break;
    }
  }

  function _updateLayer(height, id) {
    let node = refs[`${id}_sublayer`].current;
    node.style.maxHeight = `${Math.ceil(node.scrollHeight) + height}px`;
    if (props.updateLayerSize) {
      props.updateLayerSize(height);
    }
  }

  return (
    <ul className={`btb-react-list-layer layer-${props.iteration}`} style={getStyle(env.styleObj, ['btb-react-list-layer', `layer-${props.iteration}`])}>
      {
        props.subdataList.map((entry) => {
          if (typeof entry.children != 'undefined') {
            return (
              <li className="layer_container" style={getStyle(env.styleObj, ['layer_container'])} key={entry.id}>
                <div className={classnames('container_entry', `entry-${entry.id}`, { 'entry-collapsable' : env.collapseEnable }, { 'entry-active' : env.state_activeID.value === entry.id })} style={{ 'paddingLeft' : `${props.iteration}rem`, ...getStyle(env.styleObj, ['container_entry', `entry-${entry.id}`, env.collapseEnable && 'entry-collapsable' || '', (env.state_activeID.value === entry.id) ? 'entry-active' : '']) }} onClick={() => { _toggleCollapsed(entry); }}>
                  <div className="entry_title" style={getStyle(env.styleObj, ['entry_title'])}>
                    {(env.slotObj[entry.id]) ? ((typeof env.slotObj[entry.id] == 'function') ? env.slotObj[entry.id](entry) : env.slotObj[entry.id]) : (entry.title)}
                  </div>
                  {
                    (env.collapseEnable) ?
                      (
                        <div className={classnames('entry_collapseBtn', 'collapseBtn-default', { 'collapseBtn-on' : env.state_collapsed.has(entry.id) })} style={getStyle(env.styleObj, ['entry_collapseBtn', 'collapseBtn-default', env.state_collapsed.has(entry.id) && 'collapseBtn-on' || ''])}>
                          <div className="collapseBtn_arrow" style={getStyle(env.styleObj, ['collapseBtn_arrow'])} />
                        </div>
                      ) : []
                  }
                </div>
                {
                  (entry.children.length > 0) ?
                    (
                      <div className="container_sublayer" id={`${entry.id}_sublayer`} style={getStyle(env.styleObj, ['container_sublayer'])} ref={_ref(`${entry.id}_sublayer`)}>
                        <ListLayer subdataList={entry.children} iteration={props.iteration + 1} updateLayerSize={(event) => _updateLayer(event, entry.id)} />
                      </div>
                    ) : []
                }
              </li>
            );
          } else {
            return (
              <li className="layer_container" style={getStyle(env.styleObj, ['layer_container'])} key={entry.id}>
                <div className={classnames('container_entry', `entry-${entry.id}`, { 'entry-active' : env.state_activeID.value === entry.id })} style={{ 'paddingLeft' : `${props.iteration}rem`, ...getStyle(env.styleObj, ['container_entry', `entry-${entry.id}`, (env.state_activeID.value === entry.id) ? 'entry-active' : '']) }} onClick={() => { event.clickEntry(entry); }}>
                  <div className="entry_title" style={getStyle(env.styleObj, ['entry_title'])}>
                    {
                      (env.slotObj[entry.id]) ?
                        ((typeof env.slotObj[entry.id] == 'function') ? env.slotObj[entry.id](entry) : env.slotObj[entry.id])
                        : ((typeof entry.href == 'undefined') ? (entry.title) : (<a className="title_link" href={entry.href}>{entry.title}</a>))
                    }
                  </div>
                </div>
              </li>
            );
          }
        })
      }
    </ul>
  );
};

function useCollapseState(defaultSate) {
  const [value, setState] = useState(defaultSate);
  return {
    value,
    has : (id) => {
      return (value.indexOf(id) >= 0);
    },
    onChange : (id, state) => {
      let newValue;
      switch (state) {
      case 'hide':
        if (value.indexOf(id) < 0) {
          newValue = value.concat(id);
          setState(newValue);
        }
        break;
      case 'show':
        newValue = value.filter((entry) => {
          return entry !== id;
        });
        setState(newValue);
        break;
      }
    }
  };
}

export default ListLayer;