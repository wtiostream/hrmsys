package com.hrmsys.dao.impl;

import java.util.List;

import com.hrmsys.bean.PageBean;
import com.hrmsys.dao.EmployeeDAO;
import com.hrmsys.model.Department;
import com.hrmsys.model.Employee;
import com.hrmsys.model.Job;
import com.hrmsys.util.ConditionValidate;


public class EmployeeDAOImpl extends BaseDAO implements EmployeeDAO{
	
	public List<Employee> findByDept(Department dept){
		List<Employee> emps = this.findByProperty(Employee.class, "department", dept);
		return emps;
	}

	@Override
	public List<Employee> findAll(int start, int limit) {
		String hql = "FROM Employee";
		return this.page(hql, start, limit);
	}

	@Override
	public PageBean listByCondition(String condition, int start, int limit) {
		StringBuffer hql = new StringBuffer("select * from employee ");
		if( ConditionValidate.isEmpty(condition)){
			hql.append("where emp_id like '%" + condition + "%' or emp_name like '%" + condition + "%' limit " + limit * (start - 1) + "," + limit);
		}
		String totalsql = hql.substring(0,hql.indexOf("limit"));
		System.out.println(hql + "\n" + totalsql);
		PageBean pageBean = new PageBean();
		pageBean.setRoot(this.getBySQL(hql.toString(),Employee.class));
		pageBean.setTotalProperty(this.getBySQL(totalsql.toString(),Employee.class).size());
		return pageBean;
	}

	@Override
	public boolean save(Employee emp) {
		if(super.save(emp))
			return true;
		return false;
	}

	@Override
	public Employee findByEmpId(String empId) {
		List<Employee> emps = super.findByProperty(Employee.class, "empId", empId);
		if(emps.size() > 0)
			return emps.get(0);
		else return null;
	}

	@Override
	public boolean deleteByEmpId(String[] empIds) {
		boolean flag = true;
		for(String empId : empIds){
			if(!super.deleteById(Employee.class, empId)){
				flag = false;
			}
		}
		return flag;
	}

	@Override
	public boolean saveOrUpdate(Employee emp) {
		if(super.saveOrUpdate(emp))
			return true;
		return false;
	}

	@Override
	public boolean update(Employee emp) {
		return super.update(emp);
	}

	@Override
	public List<String> getMaxId() {
		// TODO Auto-generated method stub
		return super.findByHQL("select Max(empId) from Employee");
	}

	@Override
	public List<String> getVac(String empId) {
		// TODO Auto-generated method stub
		return this.findByHQL("select empVacation from Employee where empId = " + empId);
	}

}