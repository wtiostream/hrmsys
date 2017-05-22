package com.hrmsys.dao.impl;

import java.sql.Date;
import java.util.List;

import com.hrmsys.bean.PageBean;
import com.hrmsys.dao.AttentDAO;
import com.hrmsys.model.Attent;
import com.hrmsys.model.Department;
import com.hrmsys.util.ConditionValidate;

public class AttentDAOImpl extends BaseDAO implements AttentDAO{

	@Override
	public List<Attent> getlist(int page, int rows) {
		// TODO Auto-generated method stub
		String hql = "FROM Attent";
		return this.page(hql, page, rows);
	}

	@Override
	public PageBean getlistByCondition(String time, int start, int limit, String empId) {
		// TODO Auto-generated method stub
		StringBuffer hql = new StringBuffer("select * from attent where emp_id = " + empId);
		if( ConditionValidate.isEmpty(time)){
			hql.append(" and attent_time='" + time + "'");
		}
		hql.append(" limit " + limit * (start - 1) + "," + limit);  
		String totalsql = hql.substring(0,hql.indexOf("limit"));
		PageBean pageBean = new PageBean();
		pageBean.setRoot(this.getBySQL(hql.toString(),Attent.class));
		pageBean.setTotalProperty(this.getBySQL(totalsql.toString(),Attent.class).size());
		return pageBean;
	}
}
