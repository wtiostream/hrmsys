package com.hrmsys.dao.impl;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.hrmsys.bean.PageBean;
import com.hrmsys.dao.EmpSalaryDAO;
import com.hrmsys.model.EmpSalary;
import com.hrmsys.model.TrainRecord;
import com.hrmsys.util.ConditionValidate;

public class EmpSalaryDAOImp extends BaseDAO implements EmpSalaryDAO{
	private static final Log log = LogFactory.getLog(EmpSalaryDAOImp.class);
	@Override
	public List<EmpSalary> findAll(int start, int limit) {
		// TODO Auto-generated method stub
		String hql = "FROM EmpSalary";
		return this.page(hql, start, limit);
	}

	@Override
	public PageBean findByCondition(String condition, int start, int limit) {
		StringBuffer hql = new StringBuffer("select * from emp_salary ");
		if( ConditionValidate.isEmpty(condition)){
			hql.append("where emp_id like '%" + condition + "%' or emp_name like '%" + condition + "%' limit " + limit * (start - 1) + "," + limit);
		}
		String totalsql = hql.substring(0,hql.indexOf("limit"));
		System.out.println(hql);
		PageBean pageBean = new PageBean();
		pageBean.setRoot(this.getBySQL(hql.toString(), EmpSalary.class));
		pageBean.setTotalProperty(this.getBySQL(totalsql.toString(),EmpSalary.class).size());
		return pageBean;
	}

	@Override
	public boolean save(EmpSalary empSal) {
		// TODO Auto-generated method stub
		if(super.save(empSal)){
			return true;
		}
		return false;
	}

}
