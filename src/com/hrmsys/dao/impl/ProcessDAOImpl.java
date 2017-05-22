package com.hrmsys.dao.impl;

import java.util.List;

import com.hrmsys.bean.PageBean;
import com.hrmsys.dao.ProcessDAO;
import com.hrmsys.model.Attent;
import com.hrmsys.model.Department;
import com.hrmsys.model.Process;
import com.hrmsys.util.ConditionValidate;

public class ProcessDAOImpl extends BaseDAO implements ProcessDAO{

	@Override
	public PageBean getListByempId(String empId, String condition, int start, int limit, String roleId) {
		// TODO Auto-generated method stub
		StringBuffer hql;
		if(roleId.equalsIgnoreCase("1")){
			hql = new StringBuffer("select * from process where emp_id = " + empId + " and pro_statues != 5 and pro_statues != -1");
		}else if(roleId.equalsIgnoreCase("2")){
			hql = new StringBuffer("select * from process where emp_id = " + empId + " and pro_statues != 5 and pro_statues != -2");
		}else{
			hql = new StringBuffer("select * from process where emp_id = " + empId + " and pro_statues != 5 and pro_statues != -3");
		}
		if( ConditionValidate.isEmpty(condition)){
			hql.append(" and type = " + condition);
		}
		hql.append(" limit " + limit * (start - 1) + "," + limit);
		String totalsql = hql.substring(0,hql.indexOf("limit"));
		PageBean pageBean = new PageBean();
		pageBean.setRoot(this.getBySQL(hql.toString(),Process.class));
		pageBean.setTotalProperty(this.getBySQL(totalsql.toString(),Process.class).size());
		return pageBean;
	}

	@Override
	public boolean save(Process pro) {
		// TODO Auto-generated method stub
		if(super.saveOrUpdate(pro))
			return true;
		return false;
	}

	@Override
	public List<Process> getListBystaId(String deptId, int page, int rows) {
		// TODO Auto-generated method stub
		String hql = "From Process where proStatues = 2 or proStatues = -2 and Manager is not null and employee.department.deptId = " + deptId;
		return super.page(hql, page, rows);
	}

	@Override
	public List<Process> getStaByProId(String proId) {
		// TODO Auto-generated method stub
		String hql = "FROM Process where processId = " + proId;
		return super.findByHQL(hql);
	}

	@Override
	public List<Process> getListById(int page, int rows) {
		// TODO Auto-generated method stub
		String hql = "From Process where proStatues = 3 ";
		return super.page(hql, page, rows);
	}

	@Override
	public PageBean getlistOver(String empId, String condition, int start,
			int limit, String roleId) {
		// TODO Auto-generated method stub
		StringBuffer hql;
		if(roleId.equalsIgnoreCase("1")){
			hql = new StringBuffer("select * from process where emp_id = " + empId + " and pro_statues = 5 or pro_statues = -1");
		}else if(roleId.equalsIgnoreCase("2")){
			hql = new StringBuffer("select * from process where emp_id = " + empId + " and pro_statues = 5 or pro_statues = -2 and manager is null");
		}else{
			hql = new StringBuffer("select * from process where emp_id = " + empId + " and pro_statues = 5 or pro_statues = -3 and hr is null");
		}
		if( ConditionValidate.isEmpty(condition)){
			hql.append(" and type = " + condition);
		}
		hql.append(" limit " + limit * (start - 1) + "," + limit);
		String totalsql = hql.substring(0,hql.indexOf("limit"));
		PageBean pageBean = new PageBean();
		pageBean.setRoot(this.getBySQL(hql.toString(),Process.class));
		pageBean.setTotalProperty(this.getBySQL(totalsql.toString(),Process.class).size());
		return pageBean;
	}

	@Override
	public List<Process> getProsByboss(int page, int rows) {
		// TODO Auto-generated method stub
		String hql = "From Process where proStatues = 4 ";
		return super.page(hql, page, rows);
	}

}
