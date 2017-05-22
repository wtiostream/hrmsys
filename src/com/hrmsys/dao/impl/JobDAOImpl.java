package com.hrmsys.dao.impl;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.hrmsys.bean.PageBean;
import com.hrmsys.dao.JobDAO;
import com.hrmsys.model.Department;
import com.hrmsys.model.Job;
import com.hrmsys.util.ConditionValidate;

public class JobDAOImpl extends BaseDAO implements JobDAO{
	private static final Log log = LogFactory.getLog(JobDAOImpl.class);
	// property constants
	public static final String JOB_NAME = "jobName";
	public static final String JOB_REMARK = "jobRemark";
	public static final String JOB_DEPARTMENT = "department";
	
	protected void initDao() {
		// do nothing
	}

	@Override
	public List<Job> findAll(int start, int limit) {
		String hql = "FROM Job";
		return super.page(hql, start, limit);
	}

	@Override
	public PageBean findByCondition(String condition, int start, int limit) {
		StringBuffer hql = new StringBuffer("select * from job ");
		if( ConditionValidate.isEmpty(condition)){
			hql.append("where job_id like '%" + condition + "%' or job_name like '%" + condition + "%' or job_basic_wage like '%" + condition + "%' limit " + limit * (start - 1) + "," + limit);  
		}
		String totalsql = hql.substring(0,hql.indexOf("limit"));
		PageBean pageBean = new PageBean();
		pageBean.setRoot(this.getBySQL(hql.toString(),Job.class));
		pageBean.setTotalProperty(this.getBySQL(totalsql.toString(),Job.class).size());
		return pageBean;
	}
	@Override
	public boolean delete(String[] deptIds){
		boolean flag = true;
		for(String deptId : deptIds){
			if(!super.deleteById(Job.class, Integer.parseInt(deptId)))
				flag = false;
		}
		return flag;
	}

	@Override
	public boolean saveOrUpdate(Job job) {
		return super.saveOrUpdate(job);
	}

	@Override
	public Job findByJobId(int jobId) {
		List<Job> jobs = super.findByProperty(Job.class, "jobId", jobId);
		if(jobs.size() > 0){
			return jobs.get(0);
		}
		return null;
	}

	@Override
	public List<Job> findByDeptId(String deptId) {
		String hql = "FROM Job WHERE department.deptId = ?";
		return super.findByHQLAndValue(hql, deptId);
	}

	@Override
	public boolean uniqueJobName(String jobName) {
		String hql = "FROM Job WHERE jobName = ?";
		List<Job> jobs = this.findByHQLAndValue(hql, jobName);
		if(jobs.size() > 0){
			return false;
		}
		return true;
	}

	@Override
	public List<String> getMaxId() {
		// TODO Auto-generated method stub
		return super.findByHQL("select Max(jobId) from Job");
	}

	@Override
	public List<Float> getWageById(int jobId) {
		// TODO Auto-generated method stub
		String hql = "select jobBasicWage from Job where jobId = ?";
		return super.findByHQLAndValue(hql, jobId);
	}

	@Override
	public List<Job> charts() {
		// TODO Auto-generated method stub
		String hql = "FROM Job";
		return super.findByHQL(hql);
	}
	
}