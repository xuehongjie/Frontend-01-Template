import Panel from './Panel';
import { createElement, Text, Wrapper } from './createElement';

let content = data.map((url) => <img src={url}></img>);

let panel = (
  <TabPanel title="this is my panel">
    <span title="title1">this is content1</span>
    <span title="title2">this is content2</span>
    <span title="title3">this is content3</span>
    <span title="title4">this is content4</span>
  </TabPanel>
);
panel.mountTo(document.body);

/* let list = <ListView data={data}>
  {record => {}}
</ListView> */
