/**
 * Created by MW on 2017/3/10.
 */
import React,{Component} from 'react';
import { Tree,Layout} from '../../base/components/AntdComp';
const { Sider } = Layout;
import Icon from "antd/lib/icon";

const TreeNode = Tree.TreeNode;

class TreeComp extends Component{
    constructor(props){
        super(props);
    }

    //初始化请求数据
    componentDidMount() {
        this.props.emptyData();
        this.props.getDepartments();
        this.props.emptyDepartment();
    }


    drawMapTreeTreeNode = (data) => data.map((item) => {
        if(item.children){
            if (item.children.length > 0) {
                return (
                    <TreeNode {...item} key={item.id} title={
                        <div className="tree-node" style={{backgroundColor:item.deptCode == this.props.tree.activeDepartment ? '#d2eafb' : ''}}>
                            <p className="name">{item.deptName}</p>
                            {
                                item.deptMgrName && <Icon className="icon" type="user" />
                            }
                        </div>
                    } >
                        {
                            this.drawMapTreeTreeNode(item.children)
                        }
                    </TreeNode>
                );
            } else {
                delete item.children;
            }
        }
        return(
            <TreeNode {...item} key={item.id} title={
                <div className="tree-node" style={{backgroundColor:item.deptCode == this.props.tree.activeDepartment ? '#d2eafb' : ''}}>
                    <p className="name">{item.deptName}</p>
                    {
                        item.deptMgrName && <Icon className="icon" type="user" />
                    }
                </div>
            } >

            </TreeNode>
        );

    })

    render(){
        let renderTree;
        if(this.props.tree.data.length>0){
            renderTree = <Tree className="draggable-tree" defaultSelectedKeys={[this.props.tree.data[0]?String(this.props.tree.data[0].id):'']} defaultExpandedKeys={[this.props.tree.data[0]?String(this.props.tree.data[0].id):'']} onSelect={this.props.onSelect}>
                            {this.drawMapTreeTreeNode(this.props.tree.data)}
                        </Tree>;
        }
        return(
                <div className={this.props.personManage.selectOrgChart ? 'org-tree-comp active':'org-tree-comp'}>
                    {renderTree}
                </div>
        )
    }
}

export default TreeComp