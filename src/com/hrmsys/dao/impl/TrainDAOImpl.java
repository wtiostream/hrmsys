package com.hrmsys.dao.impl;

import java.util.List;

import com.hrmsys.bean.PageBean;
import com.hrmsys.bean.TrainBean;
import com.hrmsys.dao.TrainDAO;
import com.hrmsys.model.Department;
import com.hrmsys.model.Train;
import com.hrmsys.util.ConditionValidate;

public class TrainDAOImpl extends BaseDAO implements TrainDAO{

	@Override
	public List<Train> findAll() {
		return super.findAll(Train.class);
	}

	@Override
	public PageBean findAllByCondition(String condition, int start, int limit) {
		StringBuffer hql = new StringBuffer("select * from train ");
		if( ConditionValidate.isEmpty(condition)){
			hql.append("where train_person like '%" + condition + "%' or train_title like '%" + condition + "%' or train_add_person like '%" + condition + "%'or train_level like '%" +condition+ "%' limit " + limit * (start - 1) + "," + limit);
		}
		String totalsql = hql.substring(0,hql.indexOf("limit"));
		PageBean pageBean = new PageBean();
		pageBean.setRoot(this.getBySQL(hql.toString(),Train.class));
		pageBean.setTotalProperty(this.getBySQL(totalsql.toString(),Train.class).size());
		return pageBean;
	}

	@Override
	public boolean save(Train train) {
		if(super.saveOrUpdate(train)) return true;
		return false;
	}

	@Override
	public boolean delete(String[] trainIds) {
		boolean flag = true;
		for(String trainId : trainIds){
			if(!super.deleteById(Train.class, Integer.parseInt(trainId))){
				flag = false;
			}
		}
		return flag;
	}

	@Override
	public List<Train> findTrainById(int trainId) {
		return this.findByProperty(Train.class, "trainId", trainId);
	}

	@Override
	public PageBean findAll(String start, String limit) {
		String hql = "FROM Train";
		PageBean pageBean = new PageBean();
		pageBean.setRoot(this.page(hql, Integer.parseInt(start), Integer.parseInt(limit)));
		pageBean.setTotalProperty(this.findTotal(Train.class));
		return pageBean;
	}

	@Override
	public List<Train> getExtralItem() {
		// TODO Auto-generated method stub
		return this.findBySQL("select * FROM train where train_id not in (select train_id from train_record)");
	}
	
}