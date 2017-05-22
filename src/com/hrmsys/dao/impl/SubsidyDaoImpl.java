package com.hrmsys.dao.impl;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.hrmsys.bean.PageBean;
import com.hrmsys.dao.SubsidyDAO;
import com.hrmsys.model.Department;
import com.hrmsys.model.EmpSubsidy;
import com.hrmsys.util.ConditionValidate;

public class SubsidyDaoImpl extends BaseDAO implements SubsidyDAO{
	private static final Log log = LogFactory.getLog(SubsidyDaoImpl.class);

	@Override
	public List<EmpSubsidy> findAll(int page, int rows) {
		// TODO Auto-generated method stub
		String hql = "from EmpSubsidy";
		return super.page(hql, page, rows);
	}

	@Override
	public PageBean findByCondition(String condition, int start, int limit) {
		// TODO Auto-generated method stub
		StringBuffer hql = new StringBuffer("select * from emp_subsidy ");
		if( ConditionValidate.isEmpty(condition)){
			hql.append("where emp_id like '%" + condition + "%' or emp_name like '%" + condition+ "%' limit " + limit * (start - 1) + "," + limit);
		}
		String totalsql = hql.substring(0,hql.indexOf("limit"));
		PageBean pageBean = new PageBean();
		pageBean.setRoot(this.getBySQL(hql.toString(),EmpSubsidy.class));
		pageBean.setTotalProperty(this.getBySQL(totalsql.toString(),EmpSubsidy.class).size());
		return pageBean;
	}

	@Override
	public boolean delete(String[] empIds) {
		// TODO Auto-generated method stub
		boolean flag = true;
		for(String empId : empIds){
			if(!super.deleteById(EmpSubsidy.class, Integer.parseInt(empId)));
				flag = false;
		}
		return flag;
	}

	@Override
	public boolean saveOrUpdate(EmpSubsidy sub) {
		// TODO Auto-generated method stub
		return super.saveOrUpdate(sub);
	}

	@Override
	public List<EmpSubsidy> findByEmpId(String empId) {
		// TODO Auto-generated method stub
		String hql = "from EmpSubsidy where empId = ?";
		return super.findByHQLAndValue(hql, empId);
	}

	@Override
	public List<EmpSubsidy> getAll() {
		// TODO Auto-generated method stub
		return super.findAll(EmpSubsidy.class);
	}
}
