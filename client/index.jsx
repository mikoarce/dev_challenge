import React from 'react';
import { render } from 'react-dom';
import 'semantic-ui-css/components/menu.css';
import 'semantic-ui-css/components/site.css';
import 'semantic-ui-css/components/transition.css';
import 'semantic-ui-css/components/reset.css';
import 'semantic-ui-css/semantic.min.css';
import 'styles/main.css';
import MainView from 'views/MainView';

render(<MainView />, document.getElementById('app'));
