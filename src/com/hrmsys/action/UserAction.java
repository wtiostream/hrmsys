package com.hrmsys.action;
/**
 * @author wt
 * @date 2017-04-20
 */
import java.util.List;

import com.hrmsys.bean.UserBean;
import com.hrmsys.dao.impl.JobDAOImpl;
import com.hrmsys.model.Job;
import com.hrmsys.model.Role;
import com.hrmsys.model.User;
import com.hrmsys.service.JobService;
import com.hrmsys.service.UserService;
import com.hrmsys.util.ConditionValidate;
import com.hrmsys.util.MD5;
import com.opensymphony.xwork2.ActionContext;

public class UserAction extends BaseAction{
	private UserService userService;
	private JobService jobService;
	/**
	 * 用户名
	 */
	private String username;
	/**
	 * 用户密码
	 */
	private String password;
	/**
	 * 验证码
	 */
	private String validateCode;
	private String condition;
	private String conditionValue;
	private UserBean userBean;
	private String ids;
	private User user;
	private String empId;
	
	private String page;
	private String rows;
	private String oldPassword;
	
	public void login(){
		String validateCode2 = (String)ActionContext.getContext().getSession().get("validateCode");
		String username = this.getRequest().getParameter("username").trim();
		String password = new MD5().complie(this.getRequest().getParameter("password").trim());
		String url = "";
		List<User> users = userService.validateUser(username,password);
		
		if(users.size()>0){
			if(!validateCode.trim().equalsIgnoreCase(validateCode2.trim())){
				this.addActionMessage("验证码不正确");
				this.out("1");
				return;
			}
		}else{
			this.addActionMessage("用户名或密码错误");
			this.out("2");
			return;
		}
		
//		ActionContext.getContext().getSession().put("user", users.get(0));
		switch (users.get(0).getRole().getRoleId()) {
		case 1:
			ActionContext.getContext().getSession().put("emp", users.get(0));
			url = "jsp/employee.jsp";
			break;
		case 2:
			ActionContext.getContext().getSession().put("manager", users.get(0));
			url = "jsp/manager.jsp";
			break;
		case 3:
			url = "jsp/hr.jsp";
			ActionContext.getContext().getSession().put("hr", users.get(0));
			break;
		case 4:
			url = "jsp/boss.jsp";
			ActionContext.getContext().getSession().put("boss", users.get(0));
			break;
		default:
			break;
		}
		log.info(users.get(0).getUserName() + "login sucess!");
		this.out("{url: '"+url+"'}");
	}
	
	public String exit(){
		User user = (User) this.getSession().get("user");
		if(null != user)
		log.info(user.getUserName() + " exited!");
		this.getSession().clear();
		return "exit";
	}
	
	public void list(){
		String userJson = null;
		if(ConditionValidate.isEmpty(condition)){
			userBean = new UserBean();
			if("userName".equals(condition)){
				userBean.setUserName(conditionValue);
			}
			if("empName".equals(condition)){
				userBean.setEmpName(conditionValue);
			}
			userJson = userService.getUserByCondition(userBean, page, rows);
		}else{
			userJson = userService.list(page, rows);
		}
		this.out(userJson);
	}
	
	public void delete(){
		String msg = userService.deleteByIds(ids);
		this.out("{success: true, msg: '"+msg+"'}");
	}
	
	public void save(){
		String deptId = user.getEmployee().getDepartment().getDeptId(); 
		switch (Integer.parseInt(deptId)) {
		case 1:
			Role role = new Role();
			role.setRoleId(4);
			role.setRoleName("老板");
			user.setRole(role);
			break;
		case 3:
			Role role1 = new Role();
			role1.setRoleId(3);
			role1.setRoleName("hr");
			user.setRole(role1);
			break;			
		default:
			Job job = jobService.getByJobId(String.valueOf(user.getEmployee().getJob().getJobId()));
			String jobName = job.getJobName();			
			if(jobName.indexOf("经理") > 0){
				Role role3 = new Role();
				role3.setRoleId(2);
				role3.setRoleName("经理");
				user.setRole(role3);
			}else{
				Role role4 = new Role();
				role4.setRoleId(1);
				role4.setRoleName("职员");
				user.setRole(role4);
			}
			break;
		}
		user.setUserPwd(new MD5().complie(user.getEmployee().getEmpId()));//默认密码为工号
		String msg = userService.save(user);
		this.out("{success: true, msg: '"+msg+"'}");
	}
	
	public void getUserId(){
		int userId = userService.getKeyById(empId);
		this.out("{\"success\": true, \"msg\":\""+ userId +"\"}");
	}
	
	public void updatePwd(){
		User oldUser = (User)this.getSession().get("user");
		oldUser.setUserName(user.getUserName());
		oldUser.setUserPwd(new MD5().complie(user.getUserPwd()));
		String msg = userService.save(oldUser);
		this.out("{success: true, msg: '"+msg+"'}");
	}
	public void validatePwd(){
		User user = (User) this.getSession().get("user");
		boolean msg = false;
		if(new MD5().complie(oldPassword).equals(user.getUserPwd())){
			msg = true;
		}
		this.out("{success: true, msg: "+msg+"}");
	}
	
	
	
	
	
	
	/**follow is getter and setter method**/
	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getValidateCode() {
		return validateCode;
	}

	public void setValidateCode(String validateCode) {
		this.validateCode = validateCode;
	}

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public String getConditionValue() {
		return conditionValue;
	}

	public void setConditionValue(String conditionValue) {
		this.conditionValue = conditionValue;
	}

	public UserBean getUserBean() {
		return userBean;
	}

	public void setUserBean(UserBean userBean) {
		this.userBean = userBean;
	}

	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

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

	public String getOldPassword() {
		return oldPassword;
	}

	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}
	
	public JobService getJobService() {
		return jobService;
	}
	
	public void setJobService(JobService jobService) {
		this.jobService = jobService;
	}
	
	public String getEmpId() {
		return empId;
	}
	
	public void setEmpId(String empId) {
		this.empId = empId;
	}
}
