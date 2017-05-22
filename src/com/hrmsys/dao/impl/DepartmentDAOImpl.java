package com.hrmsys.dao.impl;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.hrmsys.bean.PageBean;
import com.hrmsys.dao.DepartmentDAO;
import com.hrmsys.model.Department;
import com.hrmsys.util.ConditionValidate;

public class DepartmentDAOImpl extends BaseDAO implements DepartmentDAO{
	private static final Log log = LogFactory.getLog(DepartmentDAOImpl.class);
	// property constants
	public static final String DEPT_NAME = "deptName";
	public static final String DEPT_REMARK = "deptRemark";

	protected void initDao() {
		// do nothing
	}

	@Override
	public List<Department> findAllDept(String start, String limit) {
		String 	hql = "FROM Department";
		return this.page(hql, Integer.parseInt(start), Integer.parseInt(limit));
	}

	@Override
	public boolean save(Department dept) {
		if(super.save(dept)) return true;
		return false;
	}

	@Override
	public boolean delete(String[] deptIds) {
		boolean flag = true;
		for(String deptId: deptIds){
			if(!super.deleteById(Department.class, deptId)) flag = false;
		}
		return flag;
	}

	@Override
	public PageBean findDeptByCondition(String condition,int start, int limit) {
		StringBuffer hql = new StringBuffer("select * from department ");
		if( ConditionValidate.isEmpty(condition)){
			hql.append("where dept_id like '%" + condition + "%' or dept_name like '%" + condition + "%' or dept_mgr like '%" +condition+ "%' limit " + limit * (start - 1) + "," + limit);
		}
		String totalsql = hql.substring(0,hql.indexOf("limit"));
		PageBean pageBean = new PageBean();
		pageBean.setRoot(this.getBySQL(hql.toString(),Department.class));
		pageBean.setTotalProperty(this.getBySQL(totalsql.toString(),Department.class).size());
		return pageBean;
	}

	@Override
	public boolean saveOrUpdate(Department dept) {
		if(super.saveOrUpdate(dept)) return true;
		return false;
	}

	@Override
	public List<Department> findById(String deptId) {
		return super.findByProperty(Department.class, "deptId", deptId);
	}

	@Override
	public List<String> getAllId() {
		// TODO Auto-generated method stub
		return super.findByHQL("select deptId from Department");
	}

	@Override
	public List<String> getMaxId() {
		// TODO Auto-generated method stub
		return super.findByHQL("select Max(deptId) from Department");
	}

}