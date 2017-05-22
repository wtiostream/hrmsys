package com.hrmsys.action;

import com.hrmsys.model.Job;
import com.hrmsys.service.JobService;

public class JobAction extends BaseAction{
	private JobService jobService;
	private String ids;
	private String condition;
	private Job job;
	private String jobId;
	private String page;
	private String rows;
	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getRows() {
		return rows;
	}

	public void setRows(String rows) {
		this.rows = rows;
	}

	private String jobName;
	
	/**
	 * 部门ID
	 */
	private String deptId = null;
	
	//datagrid
	public void list(){
		String json = null;
		json = jobService.getAll(page, rows);//查询所有
		this.out(json);
	}
	
	//一键搜
	public void listByCondition(){
		String json = jobService.getJobByCondition(condition, page, rows);
		this.out(json);
	}
	
	public void delete(){
		String msg = jobService.delete(this.getIds());
		this.out("{\"success\": \"true\", \"msg\": \""+msg+"\"}");
	}
	
	public void intoUpdate(){
		String jobJson = jobService.getById(jobId);
		this.out(jobJson);
	}
	
	public void getJobsBydeptId(){
		String json = jobService.getJobByDeptId(deptId);
		this.out(json);
	}
	
	public void saveOrUpdate(){
		String msg = jobService.saveOrUpdate(job);
		this.setJob(null);//避免再次添加时还存在jobId值，导致变成修改
		this.out("{\"success\": \"true\", \"msg\": \""+msg+"\"}");
	}
	
	/**
	 * 职位名称进行唯一性校验
	 */
	public void unique(){
		String msg = jobService.unique(jobName);
		this.out("{success: true, msg: '"+msg+"'}");
	}
	
	public void getMaxId(){
		String Id = jobService.getMaxId();
		this.out(Id);
	}
	
	//直方图数据
	public void echarts(){
		String json = jobService.getChart();
		this.out(json);
	}
	
	/**
	 * set/get method
	 */
	public JobService getJobService() {
		return jobService;
	}

	public void setJobService(JobService jobService) {
		this.jobService = jobService;
	}

	public String getDeptId() {
		return deptId;
	}

	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}

	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}

	public Job getJob() {
		return job;
	}

	public void setJob(Job job) {
		this.job = job;
	}

	public String getJobId() {
		return jobId;
	}

	public void setJobId(String jobId) {
		this.jobId = jobId;
	}

	public String getJobName() {
		return jobName;
	}

	public void setJobName(String jobName) {
		this.jobName = jobName;
	}
	
	public String getCondition() {
		return condition;
	}
	public void setCondition(String condition) {
		this.condition = condition;
	}
}
