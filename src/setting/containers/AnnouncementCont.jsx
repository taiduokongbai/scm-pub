import React,{Component} from "react";
import { connect } from 'react-redux'
import actions from '../actions/AnnoucementAct'
import AnnouncementComp from '../components/AnnouncementComp';
import { Breadcrumb } from '../../base/components/AntdComp';
class AnnouncementCont extends Component {
    constructor(props,context){
        super(props,context);
    }
    render() {
        return (
            <div>
            <AnnouncementComp
                {...this.props}
            />
            </div>
        )
    }

}
const mapStateToProps = (state) => {
    return state.AnnouncementRedu.toJS()
};

const mapDispatchToProps = (dispatch) => ({
    getAnnouncementList: (page, pageSize) => dispatch(actions.getAnnouncementList({ page, pageSize })),
    announcementCheckPage:()=>dispatch(actions.announcementCheckPage()),
    setScrollAnnouncement:()=>dispatch(actions.setScrollAnnouncement()),
})
export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementCont)