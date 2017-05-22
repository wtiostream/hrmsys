package com.hrmsys.dao.impl;

import com.hrmsys.bean.PageBean;
import com.hrmsys.bean.TrainRecordBean;
import com.hrmsys.dao.TrainRecordDAO;
import com.hrmsys.model.Department;
import com.hrmsys.model.TrainRecord;
import com.hrmsys.util.ConditionValidate;

public class TrainRecordDAOImpl extends BaseDAO implements TrainRecordDAO{

	@Override
	public PageBean findAll(String start, String limit) {
		String hql = "FROM TrainRecord";
		PageBean pageBean = new PageBean();
		pageBean.setRoot(this.page(hql, Integer.parseInt(start), Integer.parseInt(limit)));
		pageBean.setTotalProperty(this.findTotal(TrainRecord.class));
		return pageBean;
	}

	@Override
	public boolean delete(String[] tRecordIds) {
		boolean flag = true;
		for(String tRecordId : tRecordIds){
			if(!super.deleteById(TrainRecord.class, Integer.parseInt(tRecordId)))
					flag = false;
		}
		return flag;
	}

	@Override
	public boolean saveOrUpdate(TrainRecord tRecord) {
		if(super.saveOrUpdate(tRecord)){
			return true;
		}
		return false;
	}

	@Override
	public TrainRecord findById(int tRecordId) {
		return super.get(TrainRecord.class, tRecordId);
	}

	@Override
	public boolean update(TrainRecord trainRecord) {
		return super.update(trainRecord);
	}

	@Override
	public PageBean findAllByCondition(String condition, int start, int limit) {
		StringBuffer hql = new StringBuffer("select * from train_record ");
		if( ConditionValidate.isEmpty(condition)){
			hql.append("where train_title like '%" + condition + "%' or tRecord_person like '%" + condition + "%' or tRecord_add_person like '%" +condition+ "%' limit " + limit * (start - 1) + "," + limit);
		}
		String totalsql = hql.substring(0,hql.indexOf("limit"));
		System.out.println(hql);
		PageBean pageBean = new PageBean();
		pageBean.setRoot(this.getBySQL(hql.toString(),TrainRecord.class));
		pageBean.setTotalProperty(this.getBySQL(totalsql.toString(),TrainRecord.class).size());
		return pageBean;
	}

}
